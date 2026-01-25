import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, MessageCircle } from "lucide-react";
import { UserProfileDTO } from "@/lib/api";

interface VolunteerDetailModalProps {
  volunteer: UserProfileDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}

export function VolunteerDetailModal({ volunteer, isOpen, onClose, onContact }: VolunteerDetailModalProps) {
  if (!volunteer) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={volunteer.avatarUrl} />
              <AvatarFallback>{volunteer.firstName?.charAt(0) || "V"}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">
                {volunteer.firstName} {volunteer.lastName}
              </DialogTitle>
              <DialogDescription className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {volunteer.location || "Brasil"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
              Sobre
            </h4>
            <p className="text-sm leading-relaxed">
              {volunteer.bio || "Sem descrição disponível."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                Skills & Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {volunteer.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
                {!volunteer.tags?.length && (
                  <span className="text-sm text-muted-foreground">-</span>
                )}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wide">
                Interesses
              </h4>
              <p className="text-sm">{volunteer.interests || "-"}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:justify-between items-center border-t pt-4 mt-2">
          <div className="text-xs text-muted-foreground">
            ID: {volunteer.guid?.substring(0, 8)}...
          </div>
          <Button className="w-full sm:w-auto gap-2" onClick={onContact}>
            <MessageCircle className="h-4 w-4" />
            Entrar em Contato
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
