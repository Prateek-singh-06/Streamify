"use server";

import { getSelf } from "@/lib/auth-service";
import { blockUser, unblockUser } from "@/lib/block-service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";
const roomService= new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);
export const onBlock=async (id:string)=>{
    const self=getSelf();
    
    // todo: adapt to disconnect from livestream
    //todo: allow ability to kick the guest
    let BlockedUser;
    try{
        BlockedUser= await blockUser(id);
    }
    catch{
        // this means user is a guest
    }
    try{
        await roomService.removeParticipant((await self).id,id)
    }catch{
        //this means user is not in the room
    }
    revalidatePath(`/u/${(await self).username}/community`);
    return BlockedUser;
    
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