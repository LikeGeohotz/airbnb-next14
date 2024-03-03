'use client';

import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

export function Counter() {
	const [amount, setAmount] = useState(0);
	return (
		<div className='flex items-center gap-x-4'>
			<Button variant='outline' size='icon' type='button'>
				<Minus className='h-4 w-4 text-primary' />
			</Button>
			<p>0</p>
			<Button variant='outline' size='icon' type='button'>
				<Plus className='h-4 w-4 text-primary' />
			</Button>
		</div>
	);
}
