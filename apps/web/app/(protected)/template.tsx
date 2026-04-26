export default function ProtectedTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-w-0 overflow-x-hidden">{children}</div>
}
