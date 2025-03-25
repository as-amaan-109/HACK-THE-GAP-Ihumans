import { auth } from "@/firebase/config";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@heroui/react";
import { signOut } from "firebase/auth";
import { Clapperboard, GitBranch, LogOut, Route, ScanSearch, TvMinimalPlay } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserDropdown({ user }) {
  const handleSignLogOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error(error?.error);
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
          showFallback
            isBordered
            color="secondary"
            as="button"
            className="transition-transform"
            src={user?.photoURL}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">{user && user?.displayName}</p>
            <p className="font-semibold">{user && user?.email}</p>
          </DropdownItem>

          <DropdownItem key="Assessment">
            <Link href={`/assessment`} className="flex  items-center gap-2 hover:text-purple-500">
              <Route  size={15}/>
              Generate Learning Path
            </Link>
          </DropdownItem>
          <DropdownItem key="viewPath">
            <Link href={`/viewpath`} className="flex  items-center gap-2 hover:text-purple-500">
              <ScanSearch  size={15}/>
              View Learning Path
            </Link>
          </DropdownItem>
          <DropdownItem key="Subscription">
            <Link href={`/enrolled-courses`} className="flex  items-center gap-2 hover:text-purple-500">
              <TvMinimalPlay size={15}/>
              Enrolled Courses
            </Link>
          </DropdownItem>
          <DropdownItem key="Courses">
            <Link href={`/my-courses`} className="flex  items-center gap-2 hover:text-purple-500">
              <Clapperboard size={15}/>
              My Courses
            </Link>
          </DropdownItem>
          <DropdownItem key="my-forks">
            <Link href={`/my-forks`} className="flex  items-center gap-2 hover:text-purple-500">
              <GitBranch size={15}/>
              Forks
            </Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={handleSignLogOut}>
            <div className="flex  items-center gap-2 ">
              <LogOut size={15} />
              Log Out
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
