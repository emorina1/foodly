import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getAllUsers, getTotalRecipes } from "@/api/services/Admin";
import { ObjectId } from "mongodb";

type User = {
  _id: string | ObjectId;
  name: string;
  email: string;
  role: "admin" | "user";
};

type AdminDashboardProps = {
  users: User[];
  recipeCount: number;
};

export default function AdminDashboard({
  users = [],
  recipeCount = 0,
}: AdminDashboardProps) {
  return (
    <div className="p-10">
      <h1 className="pt-24 p-10 text-3xl font-bold mb-6 text-pink-600">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-pink-600">Total Users</h2>
          <p className="text-2xl text-pink-600">{users.length}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-pink-600">Total Recipes</h2>
          <p className="text-2xl text-pink-600">{recipeCount}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4 text-pink-600">Users</h2>
        <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user._id.toString()}
          className="bg-gray-100 p-3 rounded shadow-sm text-pink-600"
        >
          <span className="font-medium">{user.name}</span> – {user.email} ({user.role})
        </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const users = await getAllUsers();
  const recipeCount = await getTotalRecipes();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      recipeCount,
    },
  };
};
