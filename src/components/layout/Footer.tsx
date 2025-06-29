export default function Footer() {
  return (
    <footer className="w-full h-[60px] flex justify-center items-center border-t bg-background">
      <p className="text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Bookmakase. All rights reserved.
      </p>
    </footer>
  );
}
