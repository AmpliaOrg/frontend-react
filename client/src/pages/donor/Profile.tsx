import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, UserProfileDTO } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { Loader2, Save, Edit2, MapPin, Heart, DollarSign, User } from 'lucide-react';
import { motion } from 'framer-motion';
import DonorLayout from '@/components/layouts/DonorLayout';

export default function DonorProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileDTO>({
    userGuid: user?.userId || '',
    tags: []
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.userId) {
        try {
          const data = await api.getUserProfile(user.userId);
          if (data) {
            setProfile(data);
          }
        } catch (error) {
          console.log('Profile not found, ready to create one');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await api.createOrUpdateProfile({
        ...profile,
        userGuid: user?.userId || ''
      });
      setProfile(updated);
      setIsEditing(false);
      toast.success('Perfil de doador atualizado!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DonorLayout>
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Meu Perfil de Doador</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie suas informações e preferências de doação.
              </p>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)} 
              variant={isEditing ? "outline" : "default"}
            >
              {isEditing ? 'Cancelar' : (
                <>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Editar Perfil
                </>
              )}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Foto de Perfil</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32 border-2 border-border">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="text-4xl">
                        {user?.firstName?.[0] || <User className="h-12 w-12" />}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="w-full">
                        <Label htmlFor="avatarUrl">URL da Foto</Label>
                        <Input
                          id="avatarUrl"
                          placeholder="https://..."
                          value={profile.avatarUrl || ''}
                          onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    )}
                    {!isEditing && (
                      <div className="text-center">
                        <h3 className="text-xl font-semibold">
                          {user?.firstName || "Doador"}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Localização</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" /> Cidade/Estado
                      </Label>
                      {isEditing ? (
                        <Input
                          value={profile.location || ''}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          placeholder="Ex: São Paulo, SP"
                        />
                      ) : (
                        <p className="text-sm">{profile.location || 'Não informado'}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Minha Motivação</CardTitle>
                    <CardDescription>
                      O que te motiva a apoiar causas sociais? Isso nos ajuda a sugerir projetos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio || ''}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Conte-nos um pouco sobre você..."
                        className="min-h-[150px]"
                      />
                    ) : (
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {profile.bio || 'Nenhuma descrição informada.'}
                      </p>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Causas de Interesse</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Interesses (ex: educação, animais, fome)</Label>
                      {isEditing ? (
                        <Input
                          value={profile.interests || ''}
                          onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                          placeholder="Digite seus interesses..."
                        />
                      ) : (
                        <p className="text-sm">{profile.interests || 'Não informado'}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {isEditing && (
                  <div className="flex justify-end pt-4">
                    <Button type="submit" disabled={saving} size="lg">
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Alterações
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </DonorLayout>
  );
}
