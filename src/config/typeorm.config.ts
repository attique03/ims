import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Asset } from 'src/assets/entities/asset.entity';
import { Category } from 'src/category/entities/category.entity';
import { Complaint } from 'src/complaints/entities/complaint.entity';
import { Organization } from 'src/organization/entities/organization.entity';
import { PasswordResetToken } from 'src/password-reset-token/entities/password-reset-token.entity';
import { Requests } from 'src/requests/entities/request.entity';
import { Role } from 'src/role/entities/role.entity';
import { User } from 'src/user/entities/user.entity';
import { Vendor } from 'src/vendor/entities/vendor.entity';

// export const typeOrmConfig: TypeOrmModuleOptions = {
// };

export const typeOrmConfig = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    Role,
    User,
    Organization,
    PasswordResetToken,
    Category,
    Vendor,
    Asset,
    Requests,
    Complaint,
  ],
  // autoLoadEntities: true,
  synchronize: true,
};
