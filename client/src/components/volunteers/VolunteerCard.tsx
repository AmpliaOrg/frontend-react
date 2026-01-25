import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { UserProfileDTO } from "@/lib/api";

interface VolunteerCardProps {
  volunteer: UserProfileDTO;
  onClick: (volunteer: UserProfileDTO) => void;
}

export function VolunteerCard({ volunteer, onClick }: VolunteerCardProps) {
  return (
    <Card 
      className="hover:shadow-lg transition-all cursor-pointer group" 
      onClick={() => onClick(volunteer)}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12 border-2 border-primary/10">
          <AvatarImage src={volunteer.avatarUrl} />
          <AvatarFallback>{volunteer.firstName?.charAt(0) || "V"}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">
            {volunteer.firstName || "Voluntário"} {volunteer.lastName}
          </CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {volunteer.location || "Localização não informada"}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {volunteer.tags?.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {volunteer.tags && volunteer.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{volunteer.tags.length - 3}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {volunteer.bio || "Este voluntário ainda não adicionou uma biografia."}
        </p>
      </CardContent>
    </Card>
  );
}
