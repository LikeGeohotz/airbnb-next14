import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	LoginLink,
	LogoutLink,
	RegisterLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { createAirbnbHome } from '../actions';

export async function UserNav() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const createHomewithId = createAirbnbHome.bind(null, {
		userId: user?.id as string,
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className='rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-3'>
					<MenuIcon className='w-6 h-6 lg:w-5 lg:h-5' />
					<Image
						src={
							user?.picture ??
							'https://t3.ftcdn.net/jpg/05/60/26/08/360_F_560260880_O1V3Qm2cNO5HWjN66mBh2NrlPHNHOUxW.jpg'
						}
						alt='user image'
						width={64}
						height={64}
						className='rounded-full h-8 w-8 hidden lg:block'
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end' className='w-[200px]'>
				{user ? (
					<>
						<DropdownMenuItem>
							<form action={createHomewithId} className='w-full'>
								<button type='submit' className='w-full text-start'>
									Airbnb your account
								</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/my-home' className='w-full'>
								My Listings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/favorites' className='w-full'>
								My Favorites
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href='/reservations' className='w-full'>
								My Reservations
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogoutLink className='w-full'>Logout</LogoutLink>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem>
							<RegisterLink className='w-full'>Register</RegisterLink>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LoginLink className='w-full'>Login</LoginLink>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
