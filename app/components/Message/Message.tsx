import cn from 'classnames';
import ReactMarkdown from 'react-markdown';

import {Weather as WeatherIcon, User as UserIcon} from '~/components/Icons';

import {Role} from '~/types';

export interface MessageProps {
  content: string;
  key?: string;
  role?: Role;
  error?: boolean;
}

export interface RoleIconProps {
  error?: boolean;
  role: Role;
}

/**
 * Returns the role icon based on the role (user, assistant, system)
 * @param role The role of the message
 *
 * @returns The role icon
 */
const RoleIcon = ({role}: RoleIconProps) => {
  switch (role) {
    case 'system':
    case 'assistant':
      return <WeatherIcon/>;
    case 'user':
      return <UserIcon />;
    default:
      return <WeatherIcon />;;
  };
};

const getRoleClasses = (role: Role) => {
  switch (role) {
    case 'system':
    case 'assistant':
      return 'bg-white';
    case 'user':
      return 'bg-light-shade';
    default:
      return '';
  }
};

/**
 * Renders a message
 */
export default function Message({content, error, key, role = 'user'}: MessageProps) {
  return (
    <div
      className={cn(
        'message w-full p-8',
        getRoleClasses(role),
        error && 'text-error'
      )}
      key={key || ''}
    >
      <div className="message-inner max-w-maxWidth mx-auto flex items-center space-x-4">
        <span className={cn(
          'message-role h-10 w-10 grid place-items-center rounded-full shrink-0 grow-0',
          role ==='user' && 'bg-dark-accent',
          role !== 'user' && 'bg-dark-shade',
          error
        )}>
          {<RoleIcon role={role} />}
        </span>
        <div className="response">
          <ReactMarkdown children={content} />
        </div>
      </div>
    </div>
  )
}