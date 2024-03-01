import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MenuIcon } from 'lucide-react';
import {
	RegisterLink,
	LoginLink,
	LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';

export async function UserNav() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

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