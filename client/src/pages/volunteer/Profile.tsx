import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, UserProfileDTO } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TagsInput } from '@/components/ui/tags-input';
import { toast } from 'sonner';
import { Loader2, Save, Edit2, MapPin, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
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
          // If 404, we just keep the default (new) profile
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
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error('Erro ao atualizar perfil.');
      console.error(error);
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
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
            <p className="text-muted-foreground mt-2">
              Gerencie suas informações pessoais e preferências de voluntariado.
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
            {/* Left Column - Avatar & Basic Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Foto de Perfil</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32 border-2 border-border">
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback className="text-4xl">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="w-full">
                      <Label htmlFor="avatarUrl">URL da Imagem</Label>
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
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> Idade
                    </Label>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={profile.age || ''}
                        onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
                      />
                    ) : (
                      <p className="text-sm">{profile.age ? `${profile.age} anos` : 'Não informado'}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Localização
                    </Label>
                    {isEditing ? (
                      <Input
                        value={profile.location || ''}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        placeholder="Cidade, Estado"
                      />
                    ) : (
                      <p className="text-sm">{profile.location || 'Não informado'}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sobre Mim</CardTitle>
                  <CardDescription>
                    Conte um pouco sobre você e sua motivação para ser voluntário.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={profile.bio || ''}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Escreva uma breve biografia..."
                      className="min-h-[150px]"
                    />
                  ) : (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {profile.bio || 'Nenhuma biografia informada.'}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Habilidades e Interesses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Habilidades</Label>
                    {isEditing ? (
                      <Textarea
                        value={profile.skills || ''}
                        onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                        placeholder="Descreva suas habilidades..."
                      />
                    ) : (
                      <p className="text-sm">{profile.skills || 'Não informado'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Interesses</Label>
                    {isEditing ? (
                      <Textarea
                        value={profile.interests || ''}
                        onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                        placeholder="Quais causas você apoia?"
                      />
                    ) : (
                      <p className="text-sm">{profile.interests || 'Não informado'}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <TagsInput
                      value={profile.tags || []}
                      onChange={(tags) => setProfile({ ...profile, tags })}
                      disabled={!isEditing}
                      placeholder="Adicione tags (ex: educação, saúde, meio ambiente)..."
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label>Links</Label>
                    {isEditing ? (
                      <Textarea
                        value={profile.socialLinks || ''}
                        onChange={(e) => setProfile({ ...profile, socialLinks: e.target.value })}
                        placeholder="LinkedIn, Instagram, etc..."
                      />
                    ) : (
                      <p className="text-sm">{profile.socialLinks || 'Não informado'}</p>
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
  );
}
