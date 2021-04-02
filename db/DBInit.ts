
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('test', 'root', '123456', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3308,
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: 'create_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
  }
});

sequelize.authenticate().then(() => {
  console.log('link ok');
}).catch(err => {
  console.log('link err');
})


const NoteModel = sequelize.define('note', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  creator: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  grade: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  hide: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: false, // 是否 自动添加数据的 创建、更新 时间戳
  paranoid: false, // 是否 硬删除数据
  freezeTableName: true, // 是否 冻结表名，false 访问 users表
  tableName: 'note' // 访问数据库 user 表

});


let Kimoo = NoteModel.build({  // 新建一条user数据
  creator: 'test',
  grade: 1,
  title: 'test title',
  hide: 'null',
  text: 'this text'
})

Kimoo.save(); // 必须 保存 -> 同步到数据库
