'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarTrigger,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { HouseHeart } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


import Image from "next/image"
 
export function AppSidebar() {


  return (
    <Sidebar collapsible="icon" variant="floating" className="z-100">
      <SidebarHeader >
         <SidebarMenu>
      <SidebarMenuItem>

            <SidebarMenuButton>
              <Image src="/webapp-icons/apple-touch-icon.png" alt="Acme Logo" width={20} height={20} /> NEXT SCOUT
            </SidebarMenuButton>

      </SidebarMenuItem>
    </SidebarMenu>

      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton>
            <HouseHeart className="m-2" /><a href="#">Home</a>
        </SidebarMenuButton>
        </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter ><SidebarTrigger size="lg" /> </SidebarFooter>
    </Sidebar>
  )
}