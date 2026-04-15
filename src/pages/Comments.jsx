import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const [allComments, setAllComments] = useState([]);
  const navigate = useNavigate();
  const getTotalComments = async () => {
    try {
      const res = await axios.get(
        `https://escribablog.onrender.com/api/v1/comentario/meus-blogs/comentarios`,
        { withCredentials: true },
      );
      if (res.data.success) {
        setAllComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTotalComments();
  }, []);
  console.log(allComments);

  return (
    <div className="pb-10 pt-20 md:ml-[320px] h-screen">
      <div className="max-w-6xl mx-auto mt-8 ">
        <Card className="w-full p-5 space-y-2 dark:bg-gray-800">
          <Table>
            <TableCaption>Lista dos seus comentários.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Título do Blog</TableHead>
                <TableHead>Comentário</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead className="text-center">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allComments?.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell className="flex gap-4 items-center">
                    {comment.postId.title}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell className="">{comment.userId.firstName}</TableCell>
                  <TableCell className="text-right flex gap-3 items-center justify-center">
                    <Eye
                      className="cursor-pointer"
                      onClick={() => navigate(`/blogs/${comment.postId._id}`)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Comments;
