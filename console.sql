-- 创建存储表
-- 删除已有的表（如果存在）
DROP TABLE IF EXISTS base_monitor_storage;

-- 创建新的表，包含 event_type 和 message 字段
CREATE TABLE base_monitor_storage
(
    app_id     String,                                                -- 应用 ID，存储为字符串
    event_type String,                                                -- 事件类型，存储为字符串
    message    String,                                                -- 消息内容，存储为字符串
    info       JSON,                                                  -- 其他信息，存储为 JSON 格式
    created_at DateTime('Asia/Shanghai') DEFAULT now('Asia/Shanghai') -- 时间戳，默认值为当前时间
) ENGINE = MergeTree()
    ORDER BY tuple()


-- 有了存储表，接下来就需要创建视图，为了统计数据
-- 创建物化视图
-- 删除已有的物化视图（如果存在）
DROP TABLE IF EXISTS base_monitor_view;

-- 创建物化视图
CREATE MATERIALIZED VIEW base_monitor_view
    ENGINE = MergeTree()
        ORDER BY tuple() -- 定义排序规则
    POPULATE -- 立即填充数据
AS
SELECT *,
    -- 在此可以对 raw_message 进行任何所需的处理或选择部分字段
    concat('妙码学院', event_type) AS processed_message,
    now('Asia/Shanghai') AS created_at
FROM base_monitor_storage;


-- 演示插入数据
INSERT INTO base_monitor_storage (app_id, event_type, message, info) VALUES
('1234567890', 'error', '这是一个错误消息', '{"key": "value"}'),
('1234567890', 'warning', '这是一个警告消息', '{"key": "value"}'),
('1234567890', 'info', '这是一个信息消息', '{"key": "value"}');


-- 查询数据
SELECT * FROM base_monitor_view;

SELECT * FROM system.time_zones;