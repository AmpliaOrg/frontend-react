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
import { Loader2, Save, Edit2, MapPin, Building2, Globe, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import OngLayout from '@/components/layouts/OngLayout';

export default function OngProfile() {
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
      toast.success('Perfil da organização atualizado!');
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
    <OngLayout>
      <div className="container mx-auto py-10 px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Perfil da ONG</h1>
              <p className="text-muted-foreground mt-2">
                Gerencie as informações públicas e de contato da sua organização.
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
                    <CardTitle>Logo da ONG</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32 rounded-2xl border-2 border-border">
                      <AvatarImage src={profile.avatarUrl} />
                      <AvatarFallback className="text-4xl">
                        <Building2 className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <div className="w-full">
                        <Label htmlFor="avatarUrl">URL do Logo</Label>
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
                          {user?.firstName || "Nome da Organização"}
                        </h3>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Globe className="h-4 w-4" /> Website
                      </Label>
                      {isEditing ? (
                        <Input
                          value={profile.socialLinks || ''}
                          onChange={(e) => setProfile({ ...profile, socialLinks: e.target.value })}
                          placeholder="www.ong.org.br"
                        />
                      ) : (
                        <p className="text-sm text-primary">{profile.socialLinks || 'Não informado'}</p>
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

              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Missão e História</CardTitle>
                    <CardDescription>
                      Descreva o propósito da sua ONG e o impacto que vocês buscam gerar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <Textarea
                        value={profile.bio || ''}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Escreva sobre sua ONG..."
                        className="min-h-[200px]"
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
                    <CardTitle>Áreas de Atuação</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Causas e Tags</Label>
                      {isEditing ? (
                        <Input
                          value={profile.skills || ''}
                          onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                          placeholder="Ex: Educação, Saúde, Meio Ambiente..."
                        />
                      ) : (
                        <p className="text-sm">{profile.skills || 'Não informado'}</p>
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
    </OngLayout>
  );
}
