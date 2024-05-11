import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModel from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";

const useOnPlay=(songs:Song[])=>{
    const player=usePlayer();
    const subscribeModal=useSubscribeModal();
    const authModal=useAuthModel();
    const {user,subscription}=useUser();
    const onPlay=(id:string)=>{
        if(!user){
            return authModal.onOpen();
        }
        if(!subscription){
            return subscribeModal.onOpen();
        }
        player.setId(id);
        player.setIds(songs.map((song)=>song.id));
    };
    return onPlay;
}
export default useOnPlay;
