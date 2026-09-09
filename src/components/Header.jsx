import Link from "next/link";

export default function Header() {
    return (
        <header className="site-header">
            <Link href="/" className="site-logo">
                Nattidning
            </Link>

            <nav className="site-nav" aria-label="Huvudmeny">
                <Link href="/">Start</Link>

                <div className="nav-dropdown">
                    <Link href="/articles">Artiklar</Link>

                    <ul className="dropdown-menu">
                        <li>
                            <Link href="/articles">Alla artiklar</Link>
                        </li>
                        <li>
                            <Link href="/categories/nyheter">Nyheter</Link>
                        </li>
                        <li>
                            <Link href="/categories/guide">Guider</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}