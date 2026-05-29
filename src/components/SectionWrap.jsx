import SectionTitle from './ui/SectionTitle'

export default function SectionWrap({ title, description, children }) {
    return (
        <section className="w-full mx-auto my-4 p-2 rounded-lg flex flex-col gap-2">
            <SectionTitle label={title} heading={description} />
            {children}
        </section>
    )
}
