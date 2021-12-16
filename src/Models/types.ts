export interface UserType {
  userId: number;
  name: string;
  nickname: string;
  profileImage: string;
  email: string;
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
  name: string;
  emoji: string;
  color: string;
  startGoalTime: string;
  durationGoalTime: number;
  weeks: string[];
  routineCategory: string[];
  missions: MissionType[];
  // routineCompletions: RoutineCompletionType[];
}

export interface MissionType {
  missionId: number;
  emoji: string;
  name: string;
  color: string;
  durationGoalTime: number;
  orders: number;
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
  user: Omit<UserType, 'email' | 'userId'>;
  routine: {
    routineId: number;
    name: string;
    emoji: string;
    category: string[];
    durationGoalTime: number;
    missions: Omit<MissionType, 'orders'>[];
  };
  createdAt: string; //
  updatedAt: string; //
  comments: CommentType[]; //
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
  content: string;
  createdAt: string;
  updatedAt: string;
  user: Omit<UserType, 'userId' | 'email'>;
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
