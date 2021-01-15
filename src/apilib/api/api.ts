export * from './access.service';
import { AccessService } from './access.service';
export * from './storyLines.service';
import { StoryLinesService } from './storyLines.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './videos.service';
import { VideosService } from './videos.service';
export const APIS = [AccessService, StoryLinesService, UsersService, VideosService];
