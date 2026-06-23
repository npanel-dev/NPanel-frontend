<div v-pre>

# Group Management

Group Management allows administrators to assign users to isolated node groups, so that users only see the nodes assigned to their group. This enables fine-grained access control and load distribution across different user segments.

## Overview

When grouping is **enabled**, each user is automatically assigned to a node group. Users will only be able to access nodes that belong to their assigned group. When grouping is **disabled**, all users can access all nodes normally.

The page is organized into the following tabs:

| Tab | Description |
|-----|-------------|
| **Config** | Enable/disable grouping and select the grouping mode |
| **Node Groups** | Create and manage node groups, assign nodes to groups |
| **Average Mode** | Configure and trigger even distribution of users across groups |
| **Subscribe Mode** | View subscription-to-node-group mapping and trigger recalculation |
| **Traffic Mode** | Configure traffic usage thresholds for each node group |
| **Current Grouping Result** | View the latest grouping calculation result and user distribution |
| **History** | Browse all past grouping calculation records |

---

## Config Tab

### Enable Grouping

A checkbox that globally enables or disables the grouping feature.

- **Enabled**: Users are assigned to node groups and can only access their group's nodes.
- **Disabled**: All users have access to all nodes. No grouping is applied.

Changes take effect immediately upon toggle.

### Grouping Mode

When grouping is enabled, select how users are assigned to node groups:

#### Average Mode
Users are randomly and evenly distributed across all available node groups. The system automatically balances user counts across groups.

#### Subscribe Mode
Users are grouped based on their purchased subscription plan. Each subscription is mapped to a specific node group. The mapping is configured in the product settings.

#### Traffic Mode
Users are assigned to node groups based on their total traffic usage. Each node group has a defined traffic range (in GB). Users whose usage falls within a range are assigned to the corresponding group.

### Reset All Groups

> ⚠️ **This is a destructive operation and cannot be undone.**

Clicking **Reset All Groups** will:
- Delete all node groups and user groups
- Reset all users' group assignment to 0 (ungrouped)
- Remove node group associations from all products
- Remove node group associations from all nodes

A confirmation dialog is shown before proceeding.

---

## Node Groups Tab

Manage the node groups that users can be assigned to.

### Table Columns

| Column | Description |
|--------|-------------|
| **ID** | Unique identifier of the node group |
| **Name** | Display name of the node group |
| **Description** | Optional description |
| **Type** | `Common` (default), `Subscribe Only`, or `App Only` |
| **For Calculation** | Whether this group is included in grouping calculations |
| **Traffic Range (GB)** | Min/max traffic thresholds used in Traffic Mode |
| **Sort** | Display order |

### Node Group Types

- **Common**: General-purpose group, included in all grouping modes
- **Subscribe Only**: Used only for subscription-based grouping
- **App Only**: Used for app-specific access control

### Operations

- **Create**: Opens a form to add a new node group. You can configure name, description, type, nodes to include, traffic thresholds, and sort order.
- **Edit**: Modify an existing node group.
- **Delete**: Remove a node group. Nodes in the deleted group will be reassigned.

> The **Expired** badge appears on groups associated with expired subscriptions.

---

## Average Mode Tab

### Available Node Groups

Displays the current number of node groups. This value is automatically calculated from actual node groups and cannot be edited manually.

### Group Recalculation

Triggers a full re-assignment of all users across node groups using the **Average** algorithm.

- **Current Status**: Shows the recalculation task state — Idle / Running / Completed / Failed
- **Progress Bar**: Displayed in real-time while recalculation is running (refreshes every 2 seconds)
- **Recalculate All Users**: Starts the recalculation job

> ⚠️ **Warning**: This operation reassigns all users to new groups and cannot be undone.

---

## Subscribe Mode Tab

### Subscription-to-Node-Group Mapping

Displays the current mapping between subscription plans and node groups.

| Subscription Plan | → | Node Group |
|------------------|---|-----------|
| Basic Plan | → | Group A |
| Premium Plan | → | Group B |

The mapping is derived from the node group configuration set in each subscription product. If no mapping exists, "No mapping data available" is displayed.

### Group Recalculation

Triggers recalculation using the **Subscribe** algorithm. Users are reassigned to node groups based on their current active subscription.

> ⚠️ **Warning**: This operation reassigns all users to new groups and cannot be undone.

---

## Traffic Mode Tab

### Traffic Range Configuration

Each node group can be assigned a minimum and maximum traffic usage threshold (in GB). Users whose cumulative traffic falls within a group's range will be assigned to that group.

You can set:
- **Min Traffic (GB)**: Lower bound (inclusive). Leave empty for no lower limit.
- **Max Traffic (GB)**: Upper bound (inclusive). Leave empty for no upper limit.

Changes are saved per node group individually.

### Group Recalculation

Triggers recalculation using the **Traffic** algorithm. Users are assigned to node groups based on their traffic usage compared to the configured ranges.

> ⚠️ **Warning**: This operation reassigns all users to new groups and cannot be undone.

---

## Current Grouping Result Tab

Displays the **latest completed grouping calculation**, including:

### Calculation Information

| Field | Description |
|-------|-------------|
| **Group Mode** | The mode used for the latest calculation (Average / Subscribe / Traffic) |
| **State** | Completed / Running / Failed / Idle |
| **Trigger Type** | Manual / Auto / Schedule |
| **Success / Failed** | Number of users successfully or unsuccessfully assigned |
| **Start Time** | When the calculation started |
| **End Time** | When the calculation finished |

### Grouping Details Statistics

Shows aggregate statistics across all node groups:
- **Total Users**: Total number of users assigned
- **Total Nodes**: Total number of nodes across all groups
- **Total Node Groups**: Number of node groups in the result

### Per-Group Breakdown

A table showing each node group with:
- **Node Group**: Name and ID
- **User Count**: Clicking the count opens a dialog showing the user list (ID and email) assigned to that group
- **Node Count**: Number of nodes in that group

---

## History Tab

Browse all historical grouping calculation records, ordered by most recent first.

Each record shows:
- Calculation mode, state, trigger type
- Start and end times
- Success/failed user counts
- Detailed per-group breakdown (accessible via row expansion or detail view)

---

## Usage Scenarios

### Scenario 1: Isolate Premium Users

**Goal**: Give Premium subscribers access to higher-quality nodes.

1. Go to **Node Groups** → Create two groups: `Standard` and `Premium`
2. Assign high-performance nodes to the `Premium` group
3. In the product settings, map the Premium subscription to the `Premium` node group
4. Go to **Config** → Enable grouping → Select **Subscribe Mode**
5. Go to **Subscribe Mode** tab → Click **Recalculate All Users**

### Scenario 2: Distribute Load Evenly

**Goal**: Balance user load across multiple server regions.

1. Create node groups per region (e.g., `US`, `EU`, `APAC`)
2. Assign regional nodes to each group
3. Go to **Config** → Enable grouping → Select **Average Mode**
4. Go to **Average Mode** tab → Click **Recalculate All Users**

### Scenario 3: Throttle Heavy Users

**Goal**: Move users with very high traffic usage to a separate, throttled node group.

1. Create node groups: `Normal` (0–100 GB) and `Heavy` (100+ GB)
2. Set traffic ranges in **Traffic Mode** tab
3. Go to **Config** → Enable grouping → Select **Traffic Mode**
4. Go to **Traffic Mode** tab → Click **Recalculate All Users**

---

## Important Notes

1. **Recalculation is required**: Changing the mode or node group configuration does not automatically reassign users. You must manually trigger recalculation.
2. **Real-time progress**: The running status refreshes automatically every 2 seconds.
3. **Only one job at a time**: You cannot start a new recalculation while one is already running.
4. **Reset is irreversible**: The "Reset All Groups" action permanently deletes all group data.
5. **Node group deletion**: Deleting a node group will reassign its nodes and users.

</div>
