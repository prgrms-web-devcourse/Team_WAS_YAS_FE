export interface UserType {
  userId: string;
  userName: string;
  nickName: string;
  imageUrl: string;
  email: string;
}

export interface RoutineType {
  routineId: string;
  name: string;
  emoji: string;
  color: string;
  startTime: string;
  durationTime: number;
  week: string[];
  categories: string[];
  missions: MissionType[];
  routineCompletion: RoutineCompletionType[];
}

export interface MissionType {
  missionId: string;
  emoji: string;
  missionName: string;
  color: string;
  durationTime: string;
}

export interface RoutineCompletionType {
  routineCompletionId: string;
  routineInfo: RoutineInfoType;
  date: string;
  startTime: string;
  endTime: string;
  userDurationTime: string;
  missionCompletions: MissionCompletionType[];
}

export interface RoutineInfoType {
  name: string;
  emoji: string;
  color: string;
  startTime: string;
  durationTime: number;
  week: string[];
  categories: string[];
}

export interface MissionCompletionType {
  missionCompletionId: string;
  missionId: string;
  date: string;
  durationTime: string;
  userDurationTime: string;
}

export interface RoutinePostType {
  routinePostId: string;
  title: string;
  author: string;
  routineId: string;
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  likes: PostLikeType[];
}

export interface CommentType {
  commentId: string;
  text: string;
  author: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  likes: CommentLikeType[];
}

export interface PostLikeType {
  postLikeId: string;
  postId: string;
  userId: string;
}

export interface CommentLikeType {
  commentLikeId: string;
  commentId: string;
  userId: string;
}
