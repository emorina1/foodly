import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { GetServerSideProps } from "next";

export default function AdminDashboard() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin!</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard/user",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
