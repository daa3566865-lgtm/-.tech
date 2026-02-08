import BookingForm from "@/components/BookingForm";

export const dynamic = 'force-dynamic';

export default function BookingPage() {
    return (
        <div className="container mx-auto px-4 py-12 min-h-[calc(100vh-200px)] flex items-center justify-center bg-muted/20">
            <div className="w-full">
                <BookingForm />
            </div>
        </div>
    );
}
