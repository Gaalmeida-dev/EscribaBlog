import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoMdContacts } from "react-icons/io";
import BlogCardList from "@/components/BlogCardList";
import axios from "axios";
import { toast } from "sonner";

const PublicProfile = () => {
  const { userId } = useParams();
  const { user: loggedUser } = useSelector((store) => store.auth);
  const { blogs } = useSelector((store) => store.blog);
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `https://escribablog.onrender.com/api/v1/usuario/${userId}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          setProfileUser(res.data.user);
          setFollowersCount(res.data.user.followers?.length || 0);
          setIsFollowing(
            res.data.user.followers?.some((f) => f._id === loggedUser?._id) ||
              false,
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    window.scrollTo(0, 0);
  }, [userId]);

  const userBlogs = blogs.filter(
    (b) => b.author?._id === userId && b.isPublished,
  );

  const handleFollowToggle = async () => {
    if (!loggedUser) {
      navigate("/login");
      return;
    }
    try {
      const action = isFollowing ? "deixar-seguir" : "seguir";
      const res = await axios.post(
        `https://escribablog.onrender.com/api/v1/usuario/${action}/${userId}`,
        {},
        { withCredentials: true },
      );
      if (res.data.success) {
        setIsFollowing(!isFollowing);
        setFollowersCount((c) => (isFollowing ? c - 1 : c + 1));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erro ao processar");
    }
  };

  const getContactLink = (contact) => {
    if (!contact) return "#";
    if (contact.includes("http")) return contact;
    const onlyNums = contact.replace(/\D/g, "");
    return `https://wa.me/${onlyNums}`;
  };

  if (!profileUser) return null;

  const isOwnProfile = loggedUser?._id === userId;

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 mt-8 pb-10">
        <Card className="flex md:flex-row flex-col gap-10 p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <div className="flex flex-col items-center justify-center md:w-[400px]">
            <Avatar className="w-40 h-40 border-2">
              <AvatarImage
                src={profileUser.photoUrl}
                className="object-cover"
              />
              <AvatarFallback>
                {profileUser.firstName?.[0]}
                {profileUser.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-center font-semibold text-xl text-gray-700 dark:text-gray-300 my-3">
              {profileUser.occupation || "Sem ocupação"}
            </h1>
            <div className="flex gap-3 text-sm text-muted-foreground mb-3">
              <span>
                <strong>{followersCount}</strong> seguidores
              </span>
              <span>
                <strong>{profileUser.following?.length || 0}</strong> seguindo
              </span>
            </div>
            <div className="flex gap-4 items-center mb-4">
              {profileUser.github && (
                <a
                  href={profileUser.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {profileUser.instagram && (
                <a
                  href={profileUser.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {profileUser.linkedin && (
                <a
                  href={profileUser.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
              {profileUser.contact && (
                <a
                  href={getContactLink(profileUser.contact)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoMdContacts className="w-6 h-6 text-gray-800 dark:text-gray-300" />
                </a>
              )}
            </div>
            {!isOwnProfile && (
              <Button
                onClick={handleFollowToggle}
                variant={isFollowing ? "outline" : "default"}
                style={
                  isFollowing
                    ? {}
                    : { backgroundColor: "rgb(30, 255, 230)", color: "#0a0a0a" }
                }
              >
                {isFollowing ? "Deixar de seguir" : "Seguir"}
              </Button>
            )}
            {isOwnProfile && (
              <Button
                variant="outline"
                onClick={() => navigate("/painel/perfil")}
              >
                Editar perfil
              </Button>
            )}
          </div>
          <div className="flex-1">
            <h1 className="font-bold text-center md:text-start text-4xl mb-2">
              {profileUser.firstName} {profileUser.lastName}
            </h1>
            <p className="text-sm text-muted-foreground mb-5">
              {profileUser.email}
            </p>
            <div className="flex flex-col gap-2 items-start justify-start my-5">
              <p className="font-semibold">Sobre</p>
              <p className="border dark:border-gray-600 p-6 rounded-lg w-full">
                {profileUser.bio || "Este usuário ainda não escreveu sobre si."}
              </p>
            </div>
          </div>
        </Card>

        {userBlogs.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-6">
              Publicações de {profileUser.firstName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {userBlogs.map((blog, index) => (
                <BlogCardList key={index} blog={blog} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
