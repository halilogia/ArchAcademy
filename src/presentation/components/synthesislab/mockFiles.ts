export interface MockFile {
  name: string;
  type: 'Entity' | 'Repository' | 'Service' | 'Controller';
  content: string;
}

export const MOCK_FILES: MockFile[] = [
  { name: 'User.cs', type: 'Entity', content: 'public class User { public int Id { get; set; } }' },
  { name: 'Product.cs', type: 'Entity', content: 'public class Product { public string SKU { get; set; } }' },
  { name: 'UserRepository.cs', type: 'Repository', content: 'public interface IUserRepository { ... }' },
  { name: 'OrderService.cs', type: 'Service', content: 'public class OrderService { ... }' },
  { name: 'AuthController.cs', type: 'Controller', content: 'public class AuthController : ControllerBase { ... }' },
];
