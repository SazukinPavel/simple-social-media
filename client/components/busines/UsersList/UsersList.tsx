import { User } from "../../../types";
import styles from "./UsersList.module.scss";
import UsersListItem from "./UsersListItem";

interface UsersListProps {
  users: User[];
}

const UsersList: React.FC<UsersListProps> = ({ users }) => {
  return (
    <div className={styles.UsersList}>
      {users.map((u) => (
        <UsersListItem user={u} key={u._id} />
      ))}
    </div>
  );
};

export default UsersList;
