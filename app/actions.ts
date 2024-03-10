'use server'

import { redirect } from "next/navigation";
import prisma from './lib/db';
import { supabase } from "./lib/supabase";

export async function createAirbnbHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: {
            userId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (data === null) {
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        })
        return redirect(`/create/${data.id}/structure`)
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`)
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`)
    } else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/address`)
    } else if (data.addedCategory && data.addedDescription && data.addedLocation) {
        const data = await prisma.home.create({
            data: {
                userId: userId
            }
        })
        return redirect(`/create/${data.id}/structure`)
    }
}

export async function createCategoryPage(formData: FormData) {
    const categoryName = formData.get('categoryName') as string
    const homeId = formData.get('homeId') as string
    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            categoryName: categoryName,
            addedCategory: true
        }
    })
    return redirect(`/create/${homeId}/description`)
}

export async function CreateDescription(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price');
    const imageFile = formData.get('image') as File;
    const homeId = formData.get('homeId') as string;

    const guestNumber = formData.get('guest') as string;
    const roomNumber = formData.get('room') as string;
    const bathroomNumber = formData.get('bathroom') as string;

    let imageData;
    try {
        const fileName = `${imageFile.name}-${new Date().toISOString()}`;
        const uploadResult = await supabase.storage.from('images').upload(fileName, imageFile, {
            cacheControl: '2592000',
            contentType: imageFile.type
        });
        imageData = uploadResult.data;
        if (!imageData) {
            throw new Error('Image upload failed: No imageData returned');
        }
    } catch (error) {
        console.error('Supabase upload error:', error);
        throw error;
    }

    try {
        const data = await prisma.home.update({
            where: { id: homeId },
            data: {
                title: title,
                description: description,
                price: Number(price),
                bedrooms: roomNumber,
                bathrooms: bathroomNumber,
                guests: guestNumber,
                photo: imageData?.path,
                addedDescription: true
            }
        });
        return redirect(`/create/${homeId}/address`);
    } catch (error) {
        console.error('Prisma update error:', error);
        throw error;
    }
}

// export async function CreateDescription(formData: FormData) {
//     const title = formData.get('title') as string
//     const description = formData.get('description') as string
//     const price = formData.get('price')
//     const imageFile = formData.get('image') as File
//     const homeId = formData.get('homeId') as string

//     const guestNumber = formData.get('guest') as string
//     const roomNumber = formData.get('room') as string
//     const bathroomNumber = formData.get('bathroom') as string

//     const { data: imageData } = await supabase.storage
//         .from('images')
//         .upload(`${imageFile.name}-${new Date()}`, imageFile, {
//             cacheControl: '2592000',
//             contentType: 'image/png'
//         })

//     const data = await prisma.home.update({
//         where: {
//             id: homeId
//         },
//         data: {
//             title: title,
//             description: description,
//             price: Number(price),
//             bedrooms: roomNumber,
//             bathrooms: bathroomNumber,
//             guests: guestNumber,
//             photo: imageData?.path,
//             addedDescription: true
//         }
//     })
//     return redirect(`/create/${homeId}/address`)
// }

export async function createLocation(formData: FormData) {
    const homeId = formData.get('homeId') as string
    const countryValue = formData.get('countryValue') as string
    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            addedLocation: true,
            country: countryValue
        }
    })
    return redirect('/')
}

export async function addToFavorite(formData: FormData) {
    const homeId = await formData.get('homeId') as string
    const userId = await formData.get('userId') as string

    const data = await prisma.favorite.create({
        data: {
            homeId: homeId,
            userId: userId
        }
    })
}