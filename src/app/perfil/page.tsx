import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Perfil() {
  const session = await getServerSession();

  if (!session) redirect("/login");

  return (
    <div>
      <h1>Mi perfil</h1>
      <img src={session.user?.image!} width={80} />
      <p>Nombre: {session.user?.name}</p>
      <p>Email: {session.user?.email}</p>
    </div>
  );
}
