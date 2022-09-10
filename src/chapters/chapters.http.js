const chaptersControllers = require("./chapters.controllers");

const getAll = (req, res) => {
  const data = chaptersControllers.getAllChapters();
  res.status(200).json({ items: data.length, users: data });
};

const getById = (req, res) => {
  console.log(req.params.id)
  const id = req.params.id;
  const data = chaptersControllers.getChapterById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: `Chapter ${id} no exist` });
  }
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.chapter_num||
    !data.url
  ) { 
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "string",
        data_url: "string"       
      },
    });
  } else {
    const response = chaptersControllers.createChapter(data);
    return res
      .status(201)
      .json({
        message: `Chapter created succesfully with id: ${response.id}`,
        user: response,
      });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  const data = chaptersControllers.deleteChapter(id);

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({ message: "Invalid ID" });
  }
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.chapter_num||
    !data.url
    
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "string",
        data_url: "string"   
      },
    });
  } else {
    const response = chaptersControllers.editChapter(id, data, req.chapter.rol)
    return res.status(200).json({
      message: 'Chapter edited succesfully',
      user: response
    })
  }
};

const editMyChapter = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.chapter_num||
    !data.url
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        chapter_num: "string",
        data_url: "string"   
      },
    });
  } else {
    const response = userControllers.editUser(id, data)
    return res.status(200).json({
      message: 'Chapter edited succesfully',
      user: response
    })
  }
}

const getMyChapter = (req, res) => {
  const id = req.user.id;
  const data = userControllers.getChapterById(id)
  res.status(200).json(data)
}

const removeMyChapter = (req, res) => {
  const id = req.user.id;
  const data = userControllers.deleteChapter(id)
  if(data){
    res.status(204).json()
  } else {
    res.status(400).json({message: 'invalid id'})
  }
}

const postProfileImg = (req, res) => {
  const userId = req.user.id;
  //mi-sitio.com/api/v1/users/me/profile-img
  //localhost:8000/api/v1/users/me/profile-img

  const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename 

  const data = userControllers.editProfileImg(userId, imgPath)
  res.status(200).json(data)

}


module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyChapter,
  getMyChapter,
  removeMyChapter,
  postProfileImg
};
