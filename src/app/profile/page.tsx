import Image from "next/image";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

const Profile = async () => {
  const session = await getServerAuthSession();
  if (!session?.user)
    return (
      <div className="justify-center min-h-screen flex w-full bg-neutral-950 p-16">
        <Link href="/">
          <button className="rounded-lg bg-indigo-500 p-4 text-white hover:bg-indigo-600">
            Sign in to access profile
          </button>
        </Link>
      </div>
    );
  const { user } = session;

  return (
    <div className="min-h-screen bg-neutral-950 pt-16 text-white">
      <div className="mx-auto flex max-w-md space-x-2 rounded-lg bg-neutral-900 p-4">
        <Image
          src={user?.image ?? "/help-desk.png"} // Use a default image if user.image is not available
          alt={`${user?.name}'s profile`}
          className="h-12 w-12 rounded-full"
          width={32}
          height={32}
        />
        <div>
          <p className="text-gray-400">
            {user?.email ?? "youremail@example.com"}
          </p>
          <h1 className="font-semibold">{user?.name ?? "Your Name"}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
