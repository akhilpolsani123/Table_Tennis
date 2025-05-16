import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components"

export function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-[#0a1929] text-white">
      <Link href="/" className="text-2xl font-bold">
        Table Tennis Tips
      </Link>
      <div className="flex gap-4">
        <LoginLink>
          <Button variant="ghost" className="text-white hover:text-white/90">
            Sign in
          </Button>
        </LoginLink>
      </div>
    </nav>
  )
}

