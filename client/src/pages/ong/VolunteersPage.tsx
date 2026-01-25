import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api, UserProfileDTO } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { VolunteerCard } from "@/components/volunteers/VolunteerCard";
import { VolunteerFilter } from "@/components/volunteers/VolunteerFilter";
import { VolunteerDetailModal } from "@/components/volunteers/VolunteerDetailModal";

export default function VolunteersPage() {
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [page, setPage] = useState(0);
    const [selectedVolunteer, setSelectedVolunteer] = useState<UserProfileDTO | null>(null);

    // Fetch Tags
    const { data: tags = [] } = useQuery({
        queryKey: ['tags'],
        queryFn: () => api.getAllTags()
    });

    // Fetch Volunteers (paginated)
    const { data: volunteerPage, isLoading } = useQuery({
        queryKey: ['volunteers', selectedTag, page],
        queryFn: () => api.getVolunteers(selectedTag === "all" ? undefined : selectedTag, page, 9),
        placeholderData: keepPreviousData
    });

    // Handle tag change -> reset page
    const handleTagChange = (value: string) => {
        setSelectedTag(value);
        setPage(0);
    };

    const handleContact = () => {
        console.log("Contacting volunteer:", selectedVolunteer?.userGuid);
        // Placeholder for future implementation
    };

    const volunteers = volunteerPage?.content || [];
    const totalPages = volunteerPage?.totalPages || 0;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold">Voluntários Disponíveis</h1>
                    <p className="text-muted-foreground">Encontre pessoas com as habilidades que sua ONG precisa.</p>
                </div>
                <VolunteerFilter 
                    tags={tags} 
                    selectedTag={selectedTag} 
                    onTagChange={handleTagChange} 
                />
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} className="h-[200px] rounded-lg" />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {volunteers.map((volunteer) => (
                            <VolunteerCard 
                                key={volunteer.guid} 
                                volunteer={volunteer} 
                                onClick={setSelectedVolunteer} 
                            />
                        ))}
                        {volunteers.length === 0 && (
                            <div className="col-span-full py-12 text-center bg-muted/30 rounded-lg border border-dashed">
                                <User className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                                <h3 className="text-lg font-medium">Nenhum voluntário encontrado</h3>
                                <p className="text-muted-foreground">Tente limpar os filtros para ver mais resultados.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.max(0, p - 1))}
                                disabled={page === 0}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Anterior
                            </Button>
                            <span className="text-sm text-muted-foreground">
                                Página {page + 1} de {totalPages}
                            </span>
                            <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                disabled={page >= totalPages - 1}
                            >
                                Próximo
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    )}
                </>
            )}

            <VolunteerDetailModal 
                volunteer={selectedVolunteer}
                isOpen={!!selectedVolunteer}
                onClose={() => setSelectedVolunteer(null)}
                onContact={handleContact}
            />
        </div>
    );
}
