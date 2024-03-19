import Image from 'next/image';
import Link from 'next/link';

import DesktopLogo from '../../public/next.svg';
import MobileLogo from '../../public/next.svg';
import { UserNav } from './UserNav';
import { SearchModalComponent } from './SearchComponent';

export function Navbar() {
	return (
		<div className='w-full border-b'>
			<div className='flex items-center justify-between container mx-auto px-5 py-5 lg:px-10'>
				<Link href='/'>
					<Image
						src={DesktopLogo}
						alt='Desktop Logo'
						className='w-12 hidden lg:block'
					/>
					<Image
						src={MobileLogo}
						alt='Mobile Logo'
						className='block lg:hidden w-12'
					/>
				</Link>

				<SearchModalComponent />

				<UserNav />
			</div>
		</div>
	);
}
