// pages/index.tsx
import React from "react";
import Link from 'next/link'
import { GetServerSideProps } from "next";
import {
  AuthTokens,
  useAuth,
  useAuthFunctions,
  getServerSideAuth,
} from "../../auth";

const Login = (props: { initialAuth: AuthTokens }) => {
  const auth = useAuth(props.initialAuth);
  const { login, logout } = useAuthFunctions();

  let callAuthApi = async () => {
    console.info("Login#callAuthApi() BEGIN.")
    let backendUrlBrower = "http://" + process.env.BACKEND_HOSTNAME_AND_PORT;
    console.log(props.initialAuth)
    // MEMO: idTokenではなくaccessTokenであることに注意！
    const jwtToken = props.initialAuth.accessToken ? props.initialAuth.accessToken : "dummyJwt"
    const bearer = `Bearer ${jwtToken}`;
    console.log(`Authorization:${bearer}`);
    const apiResponse = await fetch(backendUrlBrower + "/backend-api-auth/sample/getAll", {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': bearer
      },
    })
    const apiResponseData = await apiResponse.json()
    console.log(apiResponseData);
    console.info("Login#callAuthApi() END.")
  }

  return (
    <React.Fragment>
      {auth ? (
        <>
          <button type="button" onClick={() => logout()}>
            sign out
          </button>
          <p>
            <Link href="#">
              <a onClick={callAuthApi}>ボタン押下処理（ブラウザのコンソールを参照）</a>
            </Link>
          </p>
        </>
      ) : (
        <React.Fragment>
          <button type="button" onClick={() => login()}>
            sign in
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

// MEMO: GetServerSideProps<{initialAuth: AuthTokens;}>とするとエラーになったのでジェネリクス記述は削除した
export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialAuth = getServerSideAuth(context.req);

  return { props: { initialAuth } };
};

export default Login;