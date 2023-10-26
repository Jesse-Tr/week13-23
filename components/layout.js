import Head from "next/head";
import Link from "next/link";

export default function Layout( { children, home } ){
    return(
        <div>
            <Head>
                <title>Basic Next.js App</title>
            </Head>
            <header>
                <nav>
                    <a href='https://www.santarosa.edu'>Visit SRJC</a>
                </nav>
            </header>
            <main>
                {children}
            </main>
            {!home && (
                <Link href="/" className="btn btn-primary mt-3">
                    back to home
                </Link>
            )
            }
            <footer>
                <p>the footer</p>
            </footer>
        </div>
    );
}