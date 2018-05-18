package service.interfaces;

import java.util.List;

import javax.ejb.Local;

import org.bson.types.ObjectId;

import model.User;

@Local
public interface UserServiceLocal {

	public boolean createUser(String str);
	public User getUser(String id);
	public List<User> readAll();
	public boolean deleteUser(String username);
	public boolean updateUser(User user);
	public User getUserByUsername(String username);
	public List<User> getUserByName(String name);
	public List<User> getUserBySurname(String surname);
	public boolean validateUser(String username, String password);
	public List<ObjectId> getUsersGroups(String username);
	public List<ObjectId> addGroup(String username, String groupId);
}
