'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Icon } from '@radix-ui/react-select';

export default function HeaderLogo() {
  const { theme } = useTheme();
  return (
    <Link href={'/'}>
      <Icon className={`ml-3 size-5`} />
    </Link>
  );
}
