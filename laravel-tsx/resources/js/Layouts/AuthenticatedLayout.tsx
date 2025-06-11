import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";
import { ChevronDown, User } from "lucide-react";
import { AppSidebar } from "@/Components/AppSidebar";
import { Toaster } from "@/Components/ui/toaster";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { PageProps } from '@/types';

// interface LayoutProps extends PropsWithChildren {
//   header?: ReactNode;
// }

export default function Authenticated({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            {header && <div className="flex items-center gap-4">{header}</div>}
          </div>

          <div className="flex items-center justify-between border-0">
            <div className="flex items-center">
              {/* Dropdown user */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden md:block px-2">
                  <div className="flex gap-2 items-center cursor-pointer">
                    <User />
                    <span>{user.name}</span>
                    <ChevronDown />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link href={route('profile.edit')} className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={route('logout')} method="post" as="button" className="w-full text-start">
                      Log Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {children}
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
