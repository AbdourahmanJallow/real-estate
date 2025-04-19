import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from '../entities/user.entity';
import { AppDataSource } from '../data-source';

export class UserSeeder {
  private userRepo: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(User);
  }

  public async run(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize();
    }
    const dummyUsers: {
      name: string;
      email: string;
      password: string;
      role: UserRole;
      address: string;
      phoneNumber: string;
    }[] = [
      {
        name: 'Admin User',
        email: 'admin@estate.com',
        password: 'password123',
        role: UserRole.ADMIN,
        address: '123 Admin Street, Admin City',
        phoneNumber: '2278218',
      },
      {
        name: 'Agent User',
        email: 'agent@estate.com',
        password: 'password123',
        role: UserRole.AGENT,
        address: '456 Agent Avenue, Agent City',
        phoneNumber: '3266457',
      },
      {
        name: 'Tenant User',
        email: 'tenant@estate.com',
        password: 'password123',
        role: UserRole.TENANT,
        address: '789 Tenant Road, Tenant City',
        phoneNumber: '2054859',
      },
    ];

    try {
      for (const {
        name,
        email,
        password,
        role,
        address,
        phoneNumber,
      } of dummyUsers) {
        const newUser = await this.createUser(
          { name, email, address, phoneNumber },
          password,
          role
        );

        console.log('User added:', newUser.email);
      }
      console.log('✅ Users seeded successfully!');
    } catch (error) {
      console.error('❌ Error seeding users:', error);
      return;
    }
  }

  private async createUser(
    userDetails: {
      name: string;
      email: string;
      address: string;
      phoneNumber: string;
    },
    rawPassword: string,
    role: UserRole
  ): Promise<User> {
    return await this.dataSource.transaction(async (transactionManager) => {
      const { name, email, address, phoneNumber } = userDetails;

      const userRepo = transactionManager.getRepository(User);

      const existingUser = await userRepo.findOneBy({ email });

      if (existingUser)
        throw new Error(`User with email ${email} already exists.`);

      let newUser: User = new User(name, email, rawPassword);
      newUser.address = address;
      newUser.phoneNumber = phoneNumber;
      newUser.role = role;
      newUser = await transactionManager.save(newUser);

      return newUser;
    });
  }

  public async drop(): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.startTransaction();
    try {
      await queryRunner.query('DELETE FROM "user"');
      await queryRunner.commitTransaction();
      console.log('User data deleted successfully!');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log('❌ Error deleting user data:', error);
    } finally {
      await queryRunner.release();
    }
  }
}

const userSeeder = new UserSeeder(AppDataSource);
userSeeder.run();
