import { PrimaryGeneratedColumn, FindOneOptions } from "typeorm";
import { connection } from ".";

export default abstract class BaseEntity {

    /**
     * Currently loaded entities
     */
    private static loaded: { [type: string]: { [id: number]: BaseEntity } } = {};

    /**
     * ID of the entity.
     */
    @PrimaryGeneratedColumn()
    id!: number;

    private static initializeList() {

        // If the instance list doesn't exist
        if (!this.loaded[this.name]) {

            // Initialize it
            this.loaded[this.name] = {};

        }

    }

    /**
     * Save the entity
     */
    async save() {

        let self = this.constructor as typeof BaseEntity;

        // Initialize the list
        self.initializeList();

        // Get the repo
        let repo = connection.getRepository(this.constructor.name);

        // Save to repo
        await repo.save(this);

        // Add to list
        self.loaded[self.name][this.id] = this;

    }

    /**
     * Load an existing entity
     */
    static async load<T extends BaseEntity>(
        this: { new(): T } & typeof BaseEntity, id: number, options?: FindOneOptions<T>
    ): Promise<T | undefined> {

        // Initialize the list
        this.initializeList();

        // Get the entity from the instance list
        let char = this.loaded[this.name][id];

        // If the entity is loaded
        if (char) {

            // Return it
            return <T>char;

        }

        // Read from database otherwise
        let repo = connection.getRepository<T>(this.name);

        // Search in the repo
        let item = await repo.findOne(id, options);

        // If entity exists
        if (item) {

            // Add entity to instance list
            this.loaded[this.name][id] = item;

        }

        return item;

    }

}
