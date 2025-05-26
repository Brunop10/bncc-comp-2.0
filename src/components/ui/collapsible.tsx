import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

function Collapsible({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root>) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />
}

function CollapsibleTrigger({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot="collapsible-trigger"
      {...props}
    />
  )
}

function CollapsibleContent({
  dangerouslySetInnerHTML,
  children,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) {
  console.log(dangerouslySetInnerHTML)

  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot="collapsible-content"
      {...props}
    >
      {dangerouslySetInnerHTML && (
        <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
      )}
      {!dangerouslySetInnerHTML && <div>{children}</div>}
    </CollapsiblePrimitive.CollapsibleContent>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
