import { db } from "./db";
import { getSelf } from "./auth-service";
export const isBlockedByUser = async(id:string) => {
    try{
        const self= await getSelf();
        if(!self){
            return false;
        }
        else{
            const otheruser=await db.user.findUnique({
                where:{
                    id:id,
                }
            })
            if(!otheruser){
                throw new Error("User not found");
            }
            if(otheruser.id===self.id){
                return false;
            }
            const blockedUsers=await db.block.findUnique({
                where:{
                    blockerId_blockedId:{
                        blockedId:otheruser.id,
                        blockerId:self.id,
                    },
                },
            });
            
            return !!blockedUsers;
        }
    }catch(error){
        return false;
    }
    
};

export const blockUser= async(id:string)=>{
    // console.log(id);
    const self= await getSelf();
    if(!self){
        throw new Error("not Authorized");
    }
    const otherUser= await db.user.findUnique({
        where:{
            id:id,
        }
    });
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id===self.id){
        throw new Error("cannot block yourself");
    }
    const existingblockeduser=await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId:self.id,
                blockedId:otherUser.id,
            }
        },
    });
    if(!!existingblockeduser){
        throw new Error("Already blocked");
    }
    const block=await db.block.create({
        data:{
            blockerId:self.id,
            blockedId:otherUser.id,
        },
        include:{
            blocked:true,
        }
    });
    return block;
}

export const unblockUser= async(id:string)=>{
    const self= await getSelf();
    if(!self){
        throw new Error("not Authorized");
    }
    const otherUser= await db.user.findUnique({
        where:{
            id:id,
        }
    });
    if(!otherUser){
        throw new Error("User not found");
    }
    if(otherUser.id===self.id){
        throw new Error("Cannot unblock yourself");
    }
    const existingblockeduser=await db.block.findUnique({
        where:{
            blockerId_blockedId:{
                blockerId:self.id,
                blockedId:otherUser.id,
            }
        },
    });
    if(!existingblockeduser){
        throw new Error("Not blocked");
    }
    const unblock=await db.block.delete({
        where:{
            id:existingblockeduser.id,
        },
        include:{
            blocked:true,
        }
    });
    return unblock;
}