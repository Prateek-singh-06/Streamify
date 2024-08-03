"use server";

import { blockUser, unblockUser } from "@/lib/block-service";
import { revalidatePath } from "next/cache";
export const onBlock=async (id:string)=>{
    
    // todo: adapt to disconnect from livestream
    //todo: allow ability to kick the guest
    try{
        const BlockedUser= await blockUser(id);
        // console.log(id);
        revalidatePath("/");
        if(!!BlockedUser){
            revalidatePath(`/${BlockedUser.blocked.username}`);
        }
        return BlockedUser;
    }catch(error){
        // console.log(error);
        throw new Error("internal server error");
    }
}

export const onUnBlock=async(id:string)=>{
    try{
        const unblockedUser= await unblockUser(id);
        revalidatePath("/");
        if(!!unblockUser){
            revalidatePath(`/${unblockedUser.blocked.username}`);
        }
        return unblockedUser;
    }catch(error){
        throw new Error("internal server error");
    }
}