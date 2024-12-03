import { SignedIn, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header>
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-end">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
