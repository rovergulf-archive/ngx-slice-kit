/*
 * Public API Surface of ngx-core-kit
 */

export { environment } from './lib/environments/environment';

/**
 * core module
 */
export { CoreModule } from './lib/core/core.module';

// pipes
export { ImagePathPipe } from './lib/core/pipes/image-path.pipe';
export { MediaPathPipe } from './lib/core/pipes/media-path.pipe';

// guards
export { AdminGuard } from "./lib/core/guards/admin.guard";
export { AuthGuard } from "./lib/core/guards/auth.guard";
export { ExternalAuthGuard } from "./lib/core/guards/external-auth.guard";

// services
export { ApiService } from "./lib/core/services/api.service";
export { AuthService } from "./lib/core/services/auth.service";
export { ErrorService } from "./lib/core/services/error.service";
export { I18nService } from "./lib/core/services/i18n.service";
export { LayoutService } from "./lib/core/services/layout.service";
export { MetaService } from "./lib/core/services/meta.service";
export { NotificationsService } from "./lib/core/services/notifications.service";
export { SocketService } from "./lib/core/services/socket.service";

/**
 * shared module
 */
export { ToolsModule } from './lib/tools/tools.module';

// errors
export { AUTH_ERRORS } from './lib/tools/errors/auth.errors';
export { RAPID_ERRORS } from './lib/tools/errors/rapid.errors';
export { USER_ERRORS } from './lib/tools/errors/user.errors';
export { WORKSPACE_ERRORS } from './lib/tools/errors/workspace.errors';
export { AppError, CONTROL_ERRORS } from './lib/tools/errors/errors.model';

// models
export { PageMeta, PageMetaOG, PageMetaImage, PageMetaTwitter } from './lib/tools/model/page-meta.model';
export { FeedEvent, Log, LogData, LogsRequest, NotificationsCounts } from './lib/tools/model/feed-event.model';
export { Invite, InvitesRequest } from './lib/tools/model/invite.model';
export { Participant } from './lib/tools/model/participant.model';
export { User, UsersRequest } from './lib/tools/model/user.model';
export { Session, SessionsResult, SessionsRequest } from './lib/tools/model/user-session.model';
export { Workspace, WorkspacesRequest, WORKSPACE_PUBLICITY, WORKSPACE_ROLES } from './lib/tools/model/workspace.model';

/**
 *  tools components & directives
 */

// components
export { EventComponent } from './lib/tools/components/event/event.component';
export { InviteComponent } from './lib/tools/components/invite/invite.component';

// directives


// layout
export { HeaderComponent } from './lib/tools/layout/header/header.component';
export { FooterComponent } from './lib/tools/layout/footer/footer.component';

