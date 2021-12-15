export interface UserType {
  userId: number | null;
  name: string | null;
  nickname: string | null;
  profileImage: string | null;
  email: string | null;
}

// export interface UserType2 {
//   userId: number;
//   userName: string;
//   nickName: string;
//   profileImageUrl: string;
//   email: string;
//   likePosts: [postId, postId];
//   likeComments: [commentId, commentId];
// }

export interface RoutineType {
  routineId: number;
  title: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  weeks: string[];
  routineCategories: string[];
  missions: MissionType[];
  // routineCompletions: RoutineCompletionType[];
}

export interface MissionType {
  missionId: number;
  emoji: string;
  title: string;
  color: string;
  durationGoalTime: number;
}

export interface RoutineCompletionType {
  routineCompletionId: number;
  routineInfo: RoutineInfoType;
  date: string;
  startTime: string;
  endTime: string;
  userDurationTime: number;
  missionCompletions: MissionCompletionType[];
}

export interface RoutineInfoType {
  title: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  routineCategories: string[];
}

export interface MissionCompletionType {
  missionCompletionId: number;
  missionId: number;
  date: string;
  durationGoalTime: number;
  userDurationTime: number;
}

export interface RoutinePostType {
  routinePostId: number;
  title: string;
  userId: number;
  routineId: number;
  createdAt: string;
  updatedAt: string;
  comments: CommentType[];
  likes: PostLikeType[];
}

// export interface RoutinePostType {
//   routinePostId: number;
//   title: string;
//   user: User; // 이름, 이미지
//   routineInfo: RoutineInfoType;
//   createdAt: string;
//   updatedAt: string;
//   comments: CommentType[];
//   likes: PostLikeType[];
// }

export interface CommentType {
  commentId: number;
  text: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  likes: CommentLikeType[];
}

// export interface CommentType {
//   commentId: number;
//   text: string;
//   user: UserType; // 이름, 이미지
//   createdAt: string;
//   updatedAt: string;
//   likes: CommentLikeType[];
// }

export interface PostLikeType {
  postLikeId: number;
  postId: number;
  userId: number;
}

export interface CommentLikeType {
  commentLikeId: number;
  commentId: number;
  userId: number;
}
