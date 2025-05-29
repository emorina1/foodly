// 📁 src/pages/dashboard/user/index.tsx
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function UserDashboard() {
  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
