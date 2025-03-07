import { HamburgerMenuIcon, PersonIcon, BellIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { getToken } from "firebase/messaging";
import { messaging } from "@/firebase/firebaseConfig";
import { ProfilePicDialog } from "./ProfilePicDialog";
import getInitials from "@/utils/getInitials";
import { useAuthContext } from "@/hooks/useAuthContext";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import { routeOptions } from "@/constants/constants.jsx";
import { useLogout } from "@/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shadcn/components/ui/sheet";
import { Separator } from "@/shadcn/components/ui/separator";
import { useUserContext } from "@/hooks/useUserContext";
import Loading from "./Loading";
import { useDocument } from "@/hooks/useDocument";
import useIsPWA from "@/hooks/useIsPWA";
import { isAfter } from "date-fns";
import Logo from "./Logo";

export default function Topbar({ setRerender }) {
  const { userDoc } = useUserContext();
  const isPwa = useIsPWA();
  const [open, setOpen] = useState(false);
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const { document: tokenDoc } = useDocument("tokens", user.uid);

  if (!userDoc) return <Loading />;

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    let authToken;
    try {
      authToken = await user.getIdToken(true);
    } catch (errToken) {
      alert("Erro ao obter token de autenticação.");
    }

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey:
          "BJaZkU7IEQWsEg9YpG_cryhAbGCyc8btkFIPaKKoeZ-QXNHP9ZYfI5-1uaeeDyfXqzzF-f6jAwtTbTb78bvAu2k",
      });

      //We can send token to server
      console.log("Token generated : ", token);
      await fetch("TODO: Change URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + authToken,
        },
        body: JSON.stringify({
          token: token,
        }),
      });
    } else if (permission === "denied") {
      //notifications are blocked
      alert("Você recusou a permissão para notificações.");
    }
  }

  if (!userDoc) return <Loading />;

  return (
    <div className="fixed w-full bg-white border border-border h-[72px] flex justify-between items-center px-5 z-[50]">
      <Logo size={172} />
      <div className="flex gap-2.5">
        <ProfilePicDialog setRerender={setRerender}>
          <Avatar className="h-12 w-12" role="button">
            <AvatarImage src={user.photoURL?.replace("=s96-c", "")} />
            <AvatarFallback className="bg-[#dfdfff] text-[#820ad1]">
              {getInitials(userDoc.name)}
            </AvatarFallback>
          </Avatar>
        </ProfilePicDialog>
      </div>
    </div>
  );
}
