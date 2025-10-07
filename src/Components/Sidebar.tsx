import { Settings } from 'lucide-react';
import { Logo } from './Logo';
import { GoPerson } from 'react-icons/go';
import { IoSearch } from 'react-icons/io5';
import { Navigation } from '../Components/Navigation/Navigation';
import { Input } from './Input';

export function Sidebar() {
  return (
    <aside className='border-r border-zinc-200 shadow-lg p-4 h-screen sticky top-0'>
      <Logo />
      <div className='flex items-center mt-4 ml-16 space-x-4'>
        <div className='flex w-12 h-12 bg-input rounded-full items-center justify-center text-zinc-500'>
          <GoPerson className='w-6 h-6' />
        </div>
        <Settings className='w-6 h-6' />
      </div>

      <Input
        placeholder='Pesquisar por...'
        icon={IoSearch}
        iconClassName="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 w-6 h-6"
        className="w-full mt-4"
        inputClassName='w-full pl-12 pr-3 py-2 border-0 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none'
      />
      <Navigation/>
    </aside>
  );
}